import nodemailer from 'nodemailer'

export async function sendInquiryEmail(data: {
  name: string
  email?: string
  phone: string
  message?: string
  propertyType?: string
  source: string
}) {
  const host = process.env.SMTP_HOST
  const port = parseInt(process.env.SMTP_PORT || '587', 10)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.SMTP_FROM || 'GT Estate <noreply@gtestate.com>'
  const to = process.env.INQUIRY_NOTIFY_EMAIL || 'info@synovolabs.com'
  const secureEnv = process.env.SMTP_SECURE

  if (!host || !user || !pass) {
    console.error('SMTP Error: Configuration missing.', { host: !!host, user: !!user, pass: !!pass })
    return { success: false, error: 'SMTP configuration missing.' }
  }

  // Common logic: port 465 is usually secure (SSL), 587 is STARTTLS (secure: false)
  const secure = secureEnv === 'true' || secureEnv === '1' || port === 465

  console.log(`SMTP Attempt: ${host}:${port} (Secure: ${secure}) for user ${user}`)

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    // Adding timeout to prevent hanging
    connectionTimeout: 10000,
    greetingTimeout: 10000,
  })

  const subject = `[GT Estate Inquiry] ${data.source === 'global' ? 'Newsletter' : 'Contact Form'}: ${data.name}`
  
  const text = `
New Inquiry Received

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email || 'Not provided'}
Source: ${data.source}
${data.propertyType ? `Property Type: ${data.propertyType}` : ''}

Message:
${data.message || 'No message provided'}
  `.trim()

  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      text,
      replyTo: data.email || undefined,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error: 'Failed to send email.' }
  }
}
