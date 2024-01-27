interface Entity {
  id: number
  name: string
  slug: string
  count?: number
  modified?: string
}

export type Category = Entity
export type Country = Entity
export type Director = Entity
export type Actor = Entity
