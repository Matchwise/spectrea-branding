export interface NavItem {
  label: string
  path: string
  children?: NavItem[]
}

export const navigation: NavItem[] = [
  {
    label: 'Overview',
    path: '/',
  },
  {
    label: 'Foundation',
    path: '/foundation',
    children: [
      { label: 'Brand Story', path: '/foundation/story' },
      { label: 'Positioning', path: '/foundation/positioning' },
      { label: 'Voice & Tone', path: '/foundation/voice' },
      { label: 'Naming', path: '/foundation/naming' },
    ],
  },
  {
    label: 'Logo',
    path: '/logo',
    children: [
      { label: 'The Logo', path: '/logo/primary' },
      { label: 'Variations', path: '/logo/variations' },
      { label: 'Guidelines', path: '/logo/guidelines' },
      { label: 'Misuse', path: '/logo/misuse' },
      { label: 'Specs & Export', path: '/logo/exploration' },
    ],
  },
  {
    label: 'Color',
    path: '/color',
    children: [
      { label: 'Overview', path: '/color/overview' },
      { label: 'Primary Palette', path: '/color/primary' },
      { label: 'Semantic Colors', path: '/color/semantic' },
      { label: 'Gradients', path: '/color/gradients' },
    ],
  },
  {
    label: 'Typography',
    path: '/typography',
    children: [
      { label: 'Typefaces', path: '/typography/typefaces' },
      { label: 'Type Scale', path: '/typography/scale' },
      { label: 'Guidelines', path: '/typography/guidelines' },
    ],
  },
  {
    label: 'Imagery & Motion',
    path: '/imagery',
    children: [
      { label: 'Illustration', path: '/imagery/illustration' },
      { label: 'Iconography', path: '/imagery/iconography' },
      { label: 'Motion', path: '/imagery/motion' },
    ],
  },
  {
    label: 'Components',
    path: '/components',
    children: [
      { label: 'Buttons', path: '/components/buttons' },
      { label: 'Forms', path: '/components/forms' },
      { label: 'Cards', path: '/components/cards' },
      { label: 'Layout', path: '/components/layout' },
    ],
  },
  {
    label: 'Communications',
    path: '/communications',
    children: [
      { label: 'Copy & Taglines', path: '/communications/copy' },
      { label: 'Trust & Disclosures', path: '/communications/trust' },
      { label: 'Social Media', path: '/communications/social' },
      { label: 'Email', path: '/communications/email' },
      { label: 'Presentations', path: '/communications/presentations' },
    ],
  },
  {
    label: 'Resources',
    path: '/resources',
    children: [
      { label: 'Downloads', path: '/resources/downloads' },
      { label: 'Governance', path: '/resources/governance' },
    ],
  },
]
