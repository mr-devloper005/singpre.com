import type { SiteRecipe } from '@/design/factory/recipe-types'

export const SITE_RECIPE: SiteRecipe = {
  productFamily: 'visual',
  themePack: 'visual-portfolio',
  homepageTemplate: 'image-profile-home',
  navbarTemplate: 'floating-bar',
  footerTemplate: 'minimal-footer',
  motionPack: 'studio-stagger',
  primaryTask: 'profile',
  enabledTasks: ['profile'],
  taskTemplates: { profile: 'profile-creator', image: 'image-portfolio' },
  manualOverrides: {
    navbar: false,
    footer: false,
    homePage: false,
    taskListPage: false,
    taskDetailPage: false,
    taskCard: false,
    contactPage: false,
    loginPage: false,
    registerPage: false,
  },
}
