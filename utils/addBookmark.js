export const addBookmark = async (name, surat, ayat) => {
    const supabase = useSupabaseClient()
    const currentUser = await getCurrentUser()

    try {
        const { error } = await supabase
            .from('bookmarks')
            .insert(
                { user_id: currentUser.id, name: name, surat: surat, ayat: ayat},
            )
        if (error) { throw error }
    } catch (error) {
        alert(error.error_description || error.message)
    }
}