export const updateBookmarkAyat = async (id, surat, ayat) => {
    const supabase = useSupabaseClient()
    try {
        const { error } = await supabase
            .from('bookmarks')
            .update({ surat: surat, ayat: ayat })
            .eq('id', id)
        if (error) alert(error.message)
    } catch (error) {
        throw error
    }
}