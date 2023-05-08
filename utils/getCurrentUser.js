export const getCurrentUser = async () => {
    const supabase = useSupabaseClient()
    try {
        const { data: { user } } = await supabase.auth.getUser()
        return user
    } catch (error) {
        throw(error.error_description || error.message)
    }
}
