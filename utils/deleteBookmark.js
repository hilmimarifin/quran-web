export const deleteBookmark = async (id) => {
    const supabase = useSupabaseClient()
    
    try {
        let { data, error } = await supabase
            .from('bookmarks')
            .delete()
            .eq('id', id)
        if (error) throw error

        return {data}
    } catch (error) {
        throw error
    }
}