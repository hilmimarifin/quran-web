<template>
    <div class="max-w-screen-md m-auto p-3">
        <Head>
            <title>{{ title }}</title>
        </Head>
        <div class=" flex flex-col ">
            <div class="navbar bg-base-100 max-w-screen-md z-10 border-b-4 fixed top-0 left-1/2 -translate-x-1/2">
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
                            class="menu menu-compact dropdown-content mt-3  shadow bg-base-100 rounded-box w-52">
                            <li v-for="bookmark in bookmarks2" :key="bookmark.id"
                                @click="handleClickBookmark(bookmark.surat, bookmark.ayat)">
                                <a>
                                    <div class="flex flex-row justify-between w-full">
                                        <span>{{ bookmark.name }}</span>
                                        <span class=" text-xs italic my-auto">{{ bookmark.suratName }}:{{ bookmark.ayat }}</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="navbar-center">
                    <a @click="handleClickHome" class="btn btn-ghost">
                        <div class="flex flex-col">
                            <div class=" normal-case text-xl"><h1>{{ title }}</h1></div>
                            <div class=" normal-case text-xs"><p>{{ subtitle }}</p></div>
                        </div>
                    </a>
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
                            <li @click="handleBookmark"><a>Manage Bookmarks</a></li>
                            <li @click="handleLogout"><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="card card-side bg-base-100 shadow-lg mt-16">
                <div class="card-body">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const isHomePage = ref(true)
const { data: bookmarks } = await useAsyncData('bookmarks', async () => { const { data } = await getBookmarks(); return data })
const route = useRoute()
const listSurat = await getListSurat()
const currentSurat = ref({})
const currentUser = await getCurrentUser()
const title = ref()
const subtitle = ref()
watchEffect(() => {
    if (route.params.id) {
        isHomePage.value = false
        currentSurat.value = listSurat.value.find((surat) => surat.nomor === route.params.id)
        title.value = currentSurat.value.nama
        subtitle.value = `(${currentSurat.value.arti})`
    } else {
        isHomePage.value = true
        title.value = "Al-Qur'an"
        subtitle.value= ""
    }
})

const getSuratName = (nomorSurat) => {
    const surat = listSurat.value.find(surat => surat.nomor === nomorSurat)
    return surat?.nama
}

const bookmarks2 = computed(() => {
      return bookmarks.value.map(bookmark => ({
        ...bookmark,
        suratName: getSuratName(bookmark.surat)
      }));
    });

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
        navigateTo({ path: `/surah/${surat}`, query: { ayat: ayat } })
    }
}

const handleClickHome = () => {
    navigateTo("/")
}

const handleBookmark = () => {
    navigateTo("/bookmark")
}
</script>

<style lang="scss" scoped></style>