'use client'

import { UserCard } from '@/src/entities/User/ui/UserCard'
import { CreateUser } from '@/src/page/CreateUser'
import { UserList } from '@/src/page/UserList'

export default function EmptyCommunityPage() {
  return (
    <>
      {/* <CreateUser /> */}
      <UserList />
    </>
  )
}
