export const getBookmarks = async () => {
    const supabase = useSupabaseClient()
    const currentUser = await getCurrentUser()
    try {
        let { data, error } = await supabase
            .from('bookmarks')
            .select("*")
            .eq('user_id', currentUser.id)
        if (error) throw error
        return {data}
    } catch (error) {
        throw error
    }
}