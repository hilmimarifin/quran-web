<template>
    <div>
        <div class="modal modal-bottom" :class="{ 'modal-open': showBottomModal }">
            <div class="modal-box max-w-screen-md">
                <label for="my-modal-3" class="top-2"> Tambah QS {{ route.params.id }} : {{ selectedAyat }} ke bookmark:
                </label>
                <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2"
                    @click="toggleBottomModal">✕</label>
                <ul tabindex="0">
                    <li v-for="bookmark in bookmarks" :key="bookmark.id"
                        class=" mt-1 p-2 shadow bg-base-100 rounded-box w-3/4" @click="handleAddToBookmark(bookmark.id)">
                        <a>{{ bookmark.name }}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="form-control">
            <label class="label cursor-pointer">
                <span class="label-text">Read Mode</span>
                <input type="checkbox" class="toggle" :checked="isReadMode" v-model="isReadMode" />
            </label>
        </div>
        <div v-if="isReadMode" class=" font-quran text-2xl text-justify">
            <p>
                {{ textAyat }}
            </p>
        </div>
        <ul v-else>
            <li v-for="ayat in ayats2" :key="ayat.nomor" @click="handleClickAyat(ayat.nomor)" :id="ayat.nomor">
                <div class="card card-side bg-base-100 shadow-sm mb-6">
                    <div class=" card-body">
                            <div class=" flex flex-col justify-between">
                                <div class=" text-end font-quran text-2xl">{{ ayat.ar }}</div>
                                <div class=" text-sm">{{ ayat.nomor }}. {{ ayat.id }}</div>
                            </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
const emit = defineEmits(['is-fetching'])
const props = defineProps(['ayat'])
const supabase = useSupabaseClient()
const route = useRoute()
const isReadMode = ref(false)
const showBottomModal = ref(false);
const {data: bookmarks} = await useAsyncData('bookmarks', async () =>{ const {data} = await getBookmarks(); return data})
const selectedAyat = ref("")

const nomor = route.params.id;
const { data: ayats2, pending } = await useFetch(`https://al-quran-8d642.firebaseio.com/surat/${nomor}.json`)
const textAyat = ayats2.value.map(obj => obj.ar).join(" | ");

watchEffect(()=>{
    emit("is-fetching", pending)
    props.ayat && navigateTo({hash: `#${props.ayat}`})
})
function toggleBottomModal() {
    showBottomModal.value = !showBottomModal.value;
}

const handleClickAyat = (ayat) => {
    selectedAyat.value = ayat
    toggleBottomModal()
}

const handleAddToBookmark = async (id) => {
    try {
        const { error } = await supabase
            .from('bookmarks')
            .update({ surat: route.params.id, ayat: selectedAyat.value })
            .eq('id', id)
        if (error) alert(error.message)
        showBottomModal.value = false
        refreshNuxtData('bookmarks')
    } catch (error) {
        throw error
    }
}

</script>

<style lang="scss" scoped></style>