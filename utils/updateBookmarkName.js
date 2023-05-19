export const updateBookmarkName = async (id, name) => {
    const supabase = useSupabaseClient()
    try {
        const { error } = await supabase
            .from('bookmarks')
            .update({ name: name })
            .eq('id', id)
        if (error) alert(error.message)
    } catch (error) {
        throw error
    }
}