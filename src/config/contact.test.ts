import { describe, it, expect } from 'vitest'
import { CONTACT_ACCESS_KEY, CONTACT_ENDPOINT, CONTACT_EMAIL } from './contact'

describe('contact configuration', () => {
  it('uses the Web3Forms submission endpoint over https', () => {
    expect(CONTACT_ENDPOINT).toBe('https://api.web3forms.com/submit')
  })

  it('targets the correct inbox', () => {
    expect(CONTACT_EMAIL).toBe('ahmedmrasoul@gmail.com')
  })

  it('is safe to run without an access key (mailto fallback)', () => {
    // A missing key must be an empty string, never a placeholder that breaks the form.
    expect(typeof CONTACT_ACCESS_KEY).toBe('string')
    expect(CONTACT_ACCESS_KEY.includes('placeholder')).toBe(false)
  })
})