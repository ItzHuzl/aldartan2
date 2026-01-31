'use client'

import { useEffect, useState } from 'react'
import PersonCard from '@/components/PersonCard'

interface Person {
  id: string
  name: string
  category: string
  emoji: string
  imageUrl?: string | null
  totalBoosts: number
  supporters: number
}

export default function Home() {
  const [people, setPeople] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPeople()
  }, [])

  const fetchPeople = async () => {
    try {
      const response = await fetch('/api/people')
      const data = await response.json()
      setPeople(data)
    } catch (error) {
      console.error('Failed to fetch people:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-white text-2xl">Уншиж байна...</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {people.map((person, index) => (
        <PersonCard
          key={person.id}
          {...person}
          rank={index + 1}
        />
      ))}
      
      {people.length === 0 && (
        <div className="col-span-full text-center py-20">
          <p className="text-white text-xl">Одоогоор хүмүүс байхгүй байна.</p>
        </div>
      )}
    </div>
  )
}
