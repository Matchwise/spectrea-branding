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
      { label: 'Primary Logo', path: '/logo/primary' },
      { label: 'Variations', path: '/logo/variations' },
      { label: 'Guidelines', path: '/logo/guidelines' },
      { label: 'Misuse', path: '/logo/misuse' },
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
      { label: 'Photography', path: '/imagery/photography' },
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
