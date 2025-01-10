'use client'

import { UserCard } from '@/src/entities/User/ui/UserCard'
import { CreateUser } from '@/src/pages/CreateUser'
import { UserList } from '@/src/pages/UserList'

export default function EmptyCommunityPage() {
  return (
    <>
      {/* <CreateUser /> */}
      <UserList />
    </>
  )
}
