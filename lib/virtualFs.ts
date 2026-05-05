// lib/virtualFs.ts
export type VFSFile = { type: 'file'; name: string }
export type VFSDir  = { type: 'dir';  name: string; children: VFSNode[] }
export type VFSNode = VFSFile | VFSDir

export const VIRTUAL_FS: VFSDir = {
  type: 'dir',
  name: 'portfolio',
  children: [
    { type: 'file', name: 'README.md' },
    { type: 'file', name: 'about.md' },
    { type: 'file', name: 'experience.md' },
    { type: 'file', name: 'resume.pdf' },
    { type: 'file', name: 'skills.md' },
    { type: 'file', name: 'contact.md' },
    {
      type: 'dir',
      name: 'my_work',
      children: [
        { type: 'file', name: 'oira-chatbot.md' },
        { type: 'file', name: 'kalmus-web.md' },
        { type: 'file', name: 'SpotOn.md' },
        { type: 'file', name: 'FeelBit.md' },
        { type: 'file', name: 'ecommerce-ml.md' },
        { type: 'file', name: 'architecture-of-sleep.md' },
        { type: 'file', name: 'portfolio-website.md' },
      ],
    },
  ],
}

function nodeAtSegments(segments: string[]): VFSNode | null {
  let current: VFSNode = VIRTUAL_FS
  for (const seg of segments) {
    if (current.type !== 'dir') return null
    const found: VFSNode | undefined = current.children.find(c => c.name === seg)
    if (!found) return null
    current = found
  }
  return current
}

export function listDir(cwdSegs: string[]): VFSNode[] | null {
  const node = nodeAtSegments(cwdSegs)
  if (!node || node.type !== 'dir') return null
  return node.children
}

export function resolveSegments(cwdSegs: string[], target: string): string[] | null {
  if (target === '~' || target === '') return []
  const segs = target.startsWith('/') ? [] : [...cwdSegs]
  for (const part of target.split('/')) {
    if (part === '' || part === '.') continue
    if (part === '..') { segs.pop() }
    else { segs.push(part) }
  }
  const node = nodeAtSegments(segs)
  return node ? segs : null
}

export function segmentsToDisplay(segs: string[]): string {
  return segs.length === 0 ? '~' : '~/' + segs.join('/')
}

export function nodeAtPath(cwdSegs: string[], name: string): VFSNode | null {
  const parent = nodeAtSegments(cwdSegs)
  if (!parent || parent.type !== 'dir') return null
  return parent.children.find(c => c.name === name) ?? null
}

export function allFiles(): { name: string; folder: string }[] {
  const results: { name: string; folder: string }[] = []
  function walk(node: VFSNode, folder: string) {
    if (node.type === 'file') {
      results.push({ name: node.name, folder })
    } else {
      node.children.forEach(child =>
        walk(child, node === VIRTUAL_FS ? '' : (folder ? folder + '/' : '') + node.name)
      )
    }
  }
  walk(VIRTUAL_FS, '')
  return results
}
