<template>
    <div class="max-w-screen-md m-auto">
        <div class="modal" :class="{ 'modal-open': showModal }">
            <div class="modal-box">
                <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2" @click="toggleModal">✕</label>
                <form class="space-y-6" @submit.prevent="addBookmark">
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
        <div class=" flex flex-col ">
            <div class="navbar bg-base-100 fixed top-0 max-w-screen-md z-10">
                <div class="navbar-start">
                    <div class="dropdown">
                        <label tabindex="0" class="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </label>
                        <ul tabindex="0"
                            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li @click="toggleModal"><a>Add bookmark</a></li>
                            <li v-for="bookmark in bookmarks" :key="bookmark.id"
                                @click="handleClickBookmark(bookmark.surat, bookmark.ayat)">
                                <a>{{ bookmark.name }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="navbar-center">
                    <a @click="handleClickHome" class="btn btn-ghost normal-case text-xl">{{ title }}</a>
                </div>
                <div class="navbar-end">
                    <div class="dropdown dropdown-end">
                        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                            <div class="w-10 rounded-full">
                                <img :src="currentUser?.user_metadata?.avatar_url" />
                            </div>
                        </label>
                        <ul tabindex="0"
                            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a class="justify-between">
                                    Profile
                                    <span class="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li @click="handleLogout"><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="card card-side bg-base-100 shadow-lg min-h-screen mt-16">
                <div class="card-body">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const showModal = ref(false);
const name = ref('')
const isHomePage = ref(true)
const currentUser = await getCurrentUser()
const { data: bookmarks } = await useAsyncData('bookmarks', async () => { const { data } = await getBookmarks(); return data })
const route = useRoute()
const listSurat = await getListSurat()
const currentSurat = ref({})
const title = ref()
watchEffect(() => {
    if (route.params.id) {
        isHomePage.value = false
        currentSurat.value = listSurat.value.find((surat) => surat.nomor === route.params.id)
        title.value = currentSurat.value.nama
    } else {
        isHomePage.value = true
        title.value = "E-Quraan"
    }
})
const addBookmark = async () => {
    try {
        const { error } = await supabase
            .from('bookmarks')
            .insert(
                { user_id: currentUser.id, name: name.value },
            )
        if (error) { throw error } else { showModal.value = false }
        refreshNuxtData('bookmarks')
    } catch (error) {
        alert(error.error_description || error.message)
    }

}

function toggleModal() {
    showModal.value = !showModal.value;
}

const handleLogout = async () => {
    try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        navigateTo('/login')
    } catch (error) {
        alert(error.error_description || error.message)
    }
}

const handleClickBookmark = (surat, ayat) => {
    if (surat) {
        navigateTo({path: `/surah/${surat}`, query: {ayat: ayat}})
    }
}

const handleClickHome = () => {
    navigateTo("/")
}
</script>

<style lang="scss" scoped></style>