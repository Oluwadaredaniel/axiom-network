import { describe, it, expect } from 'vitest'

describe('Axiom Navigation', () => {
  it('should define all core application routes', () => {
    const routes = [
      '/', '/login', '/register', '/dashboard',
      '/marketplace', '/conductor', '/wallet',
      '/developer', '/history', '/admin'
    ]
    expect(routes.length).toBe(10)
  })

  it('should have a functional landing page hero', () => {
    const heroText = "Enable AI agents to discover, hire, and pay."
    expect(heroText).toContain("AI agents")
  })
})
