import { toast } from '@/components/ui/use-toast'
import { ApiWithAuth } from '@/lib/axios'
import { create } from 'zustand'

export const useClubStore = create((set) => ({
  clubs: [],
  getClubs: async () => {
    let clubs = []
    try {
      clubs = (await ApiWithAuth.get('/clubs')).data.data
      set((state) => clubs)
    } catch(err) {
      console.error('Failed to load clubs', err.response.data.message)
    }
  },
  createClubs: async (data) => {
    try {
      let newClub = (await ApiWithAuth.post('/clubs')).data.data
      set((state) => ({ clubs: [newClub, ...state]}))
    } catch (err) {
      toast({
        title: 'Failed to create new club.',
        description: err.response.data.message
      })
    }
  },
  updateClubs: async (id, data) => {
    try {
      let newUpdatedClub = (await ApiWithAuth.put(`/clubs/${id}`)).data.data
      set((state) => {
        let updatedClubs = state.clubs.filter((curr_club) => curr_club._id !== id)
        return { clubs: [newUpdatedClub, ...updatedClubs] }
      })
    } catch(err) {
      toast({
        title: 'Failed to update a new Club.',
        description: err.response.data.message
      })
    }
  },
  deleteClub: async (id) => {
    try {
      await ApiWithAuth.delete(`/clubs/${id}`)
      set((state) => { clubs: state.clubs.filter((curr_club) => curr_club._id !== id) })
    } catch(err) {
      toast({
        title: 'Failed to delete new Club.',
        description: err.response.data.message
      })
    }
  }
}))