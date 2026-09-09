/**
 * Contact form configuration.
 *
 * HOW TO ACTIVATE:
 *   1. Go to https://web3forms.com/
 *   2. Enter your email address (ahmedmrasoul@gmail.com) and submit.
 *   3. Copy the access key from the email you receive.
 *   4. Create a `.env` file in the project root:
 *        VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
 *   5. Restart the dev server. Done — the form will now deliver to your inbox.
 *
 * If the access key is missing, the form falls back to opening a mailto: draft.
 */

export const CONTACT_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || ''

export const CONTACT_ENDPOINT = 'https://api.web3forms.com/submit'

export const CONTACT_EMAIL = 'ahmedmrasoul@gmail.com'
