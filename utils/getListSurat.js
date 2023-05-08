export const getListSurat = async() => {
    try {
        const {data: listSurat} = await useFetch("https://al-quran-8d642.firebaseio.com/data.json")
        return listSurat
    } catch (error) {
        throw error
    }
}