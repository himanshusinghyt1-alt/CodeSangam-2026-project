import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const REPO_NAME = 'CodeSangam-2026-project'

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    basepath: `/${REPO_NAME}`,
  })
  return router
}
