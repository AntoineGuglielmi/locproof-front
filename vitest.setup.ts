import '@testing-library/jest-dom/vitest'
import '@testing-library/jest-dom/vitest'

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver
