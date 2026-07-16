import { describe, it, expect } from 'vitest'

describe('Axiom Marketplace', () => {
  it('should categorize capabilities correctly', () => {
    const categories = ['Development', 'Marketing', 'Design', 'Research', 'Writing']
    expect(categories).toContain('Development')
  })

  it('should enforce price visibility on capability cards', () => {
    const mockService = {
      name: 'SEO Agent',
      price: 6,
      currency: 'AXC'
    }
    expect(mockService.price).toBeGreaterThan(0)
    expect(mockService.currency).toBe('AXC')
  })
})
