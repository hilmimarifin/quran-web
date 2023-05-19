<template>
    <div>
        <div class="modal modal-bottom" :class="{ 'modal-open': showBottomModal }">
            <div class="modal-box max-w-screen-md">
                <label for="my-modal-3" class="top-2">QS. {{ getSuratName(route.params.id) }} : {{ selectedAyat }}
                </label>
                <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2"
                    @click="toggleBottomModal">✕</label>
                <ul tabindex="0">
                    <div class="btn mt-1 shadow  rounded-box w-full normal-case" @click="handlAddClick">
                        <a>
                            <font-awesome-icon icon="fa fa-plus"/>
                            Bookmark baru
                        </a>
                    </div>
                    <li v-for="bookmark in bookmarks2" :key="bookmark.id" class=" mt-1 p-2 shadow bg-base-100 rounded-box"
                        @click="handleAddToBookmark(bookmark.id)">
                        <a>
                            <div class="flex flex-row justify-between">
                                <p>
                                    {{ bookmark.name }}
                                </p>
                                <p class="text-end text-xs italic">
                                    {{ bookmark.surat }} : {{ bookmark.ayat }}
                                </p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="modal" :class="{ 'modal-open': showModal }">
            <div class="modal-box">
                <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2" @click="toggleModal">✕</label>
                <form class="space-y-6" @submit.prevent="handleAddnewBookmark">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <div class="mt-1">
                            <input v-model="name" id="name" name="name"  type="text" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                    </div>

                    <div class="modal-action">
                        <button type="submit" class="btn normal-case">
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>


        <!-- <div class="form-control">
            <label class="label cursor-pointer">
                <span class="label-text">Read Mode</span>
                <input type="checkbox" class="toggle" :checked="isReadMode" v-model="isReadMode" />
            </label>
        </div> -->
        <div v-if="isReadMode" class=" font-quran text-2xl text-justify">
            <p>
                {{ textAyat }}
            </p>
        </div>
        <div v-else>
            <div class="w-full flex flex-row">
                <input type="number" placeholder="Ke ayat ..." v-model="searchValue" class="input input-bordered grow mr-2"
                    @keyup.enter="handleClickJumpAyat" />
                <button class="btn" @click="handleClickJumpAyat"><font-awesome-icon
                        icon="fa-solid fa-arrow-right" /></button>
            </div>
            <ul>
                <li v-for="ayat in ayats2" :key="ayat.nomor" @click="handleClickAyat(ayat.nomor)" :id="ayat.nomor">
                    <div class="border-b-2 mb-3 p-7">
                        <div class=" flex flex-col justify-between">
                            <div class=" text-end font-quran text-2xl">{{ ayat.ar }}</div>
                            <div class=" text-xs mt-2">{{ ayat.nomor }}. {{ ayat.id }}</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['is-fetching'])
const props = defineProps(['ayat'])
const supabase = useSupabaseClient()
const route = useRoute()
const isReadMode = ref(false)
const showBottomModal = ref(false);
const { data: bookmarks } = await useAsyncData('bookmarks', async () => { const { data } = await getBookmarks(); return data })
const selectedAyat = ref("")
const searchValue = ref()
const listSurat = await getListSurat()
const showModal = ref(false)
const name = ref(``)



const nomor = route.params.id;
const { data: ayats2, pending } = await useFetch(`https://al-quran-8d642.firebaseio.com/surat/${nomor}.json`)
const textAyat = computed(()=>{ return ayats2.value.map(obj => obj.ar).join(" | ")});

watchEffect(() => {
    emit("is-fetching", pending)
    props.ayat && navigateTo({ hash: `#${props.ayat}` })
})
function toggleBottomModal() {
    showBottomModal.value = !showBottomModal.value;
}

const toggleModal = () => {
    showModal.value = !showModal.value
}

const handlAddClick = () => {
    toggleBottomModal()
    toggleModal();
}

const getSuratName = (nomorSurat) => {
    const surat = listSurat.value.find(surat => surat.nomor === nomorSurat)
    return surat?.nama
}

const bookmarks2 = computed(() => {
    return bookmarks.value.map(bookmark => ({
        ...bookmark,
        surat: getSuratName(bookmark.surat)
    }));
});


const handleClickAyat = (ayat) => {
    selectedAyat.value = ayat
    name.value = `${getSuratName(route.params.id)} : ${ayat}`
    toggleBottomModal()
}

const handleAddToBookmark = async (id) => {
    try {
        await updateBookmarkAyat(id, route.params.id, selectedAyat.value)
        refreshNuxtData('bookmarks')
        toggleBottomModal()
    } catch (error) {
        throw error
    }
}

const handleAddnewBookmark = async () => {
    try {
        await addBookmark(name.value, route.params.id, selectedAyat.value)
        refreshNuxtData('bookmarks')
        toggleModal()
    } catch (error) {
        throw error
    }
}

const handleClickJumpAyat = () => {
    navigateTo({ hash: `#${searchValue.value}` })
}

</script>

<style lang="scss" scoped></style>
