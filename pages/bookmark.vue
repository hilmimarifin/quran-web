<template>
    <div>
        <div class="modal" :class="{ 'modal-open': showModal }">
            <div class="modal-box">
                <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2" @click="toggleModal">✕</label>
                <form class="space-y-6" @submit.prevent="updateBookmark">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <div class="mt-1">
                            <input v-model="name" id="name" name="name" type="text" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                    </div>

                    <div class="modal-action">
                        <button type="submit" class="btn">
                            Tambah
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div class="modal modal-bottom" :class="{ 'modal-open': showBottomModal }">
            <div class="modal-box max-w-screen-md">
                <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2"
                    @click="toggleBottomModal">✕</label>
                <ul tabindex="0">
                    <li class=" mt-1 p-2 shadow bg-base-100 rounded-box w-3/4" @click="handleEditClick">
                        <a>Edit</a>
                    </li>
                    <li class=" mt-1 p-2 shadow bg-base-100 rounded-box w-3/4" @click="handleDeleteClick">
                        <a>Delete</a>
                    </li>
                </ul>
            </div>
        </div>
        <ul>
            <li v-for=" bookmark in bookmarks2" :key="bookmark.id" class="border-b-2 mb-3 p-7" @click="selectBookmark(bookmark)">
                <div class="flex flex-row justify-between">
                    <div class="flex flex-col">
                        <p>{{ bookmark.name }}</p>
                    </div>
                    <div>
                        <p class="text-sm italic">{{ bookmark.surat }} : {{ bookmark.ayat }}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
const listSurat = await getListSurat()
const showBottomModal = ref(false);
const showModal = ref(false)
const selectedBookmark = ref({})
const name = ref('')

const getSuratName = (nomorSurat) => {
    const surat = listSurat.value.find(surat => surat.nomor === nomorSurat)
    return surat?.nama
}
const { data: bookmarks } = await useAsyncData('bookmarks', async () => { const { data } = await getBookmarks(); return data })
const bookmarks2 = computed(() => {
      return bookmarks.value.map(bookmark => ({
        ...bookmark,
        surat: getSuratName(bookmark.surat)
      }));
    });

const toggleBottomModal = () => {
    showBottomModal.value = !showBottomModal.value
}

const toggleModal = () => {
    showModal.value = !showModal.value
}

const handleEditClick = () => {
    toggleBottomModal()
    toggleModal();
}
const updateBookmark = async() => {
    await updateBookmarkName(selectedBookmark.value.id, name.value)
    refreshNuxtData('bookmarks')
    toggleModal()
}
const selectBookmark = (bookmark) => {
    toggleBottomModal()
    selectedBookmark.value = bookmark
    name.value = bookmark.name
}

const handleDeleteClick = async () => {
    await deleteBookmark(selectedBookmark.value.id)
    // console.log('selected bookmarks', selectedBookmark.value);
    refreshNuxtData('bookmarks')
    toggleBottomModal()
}
</script>

<style lang="scss" scoped></style>