<template>
    <div>
        <div>
            <input type="text" placeholder="Cari nama / nomor surat" v-model="searchValue"
                class="input input-bordered w-full" />
        </div>
        <ul>
            <li v-if="!searchValue" v-for="surat in allSurat" :key="surat.nomor">
                <NuxtLink :to="`/surah/${surat.nomor}`">
                    <div class=" border-b-2 mb-3 p-7">
                        <div class=" flex flex-row justify-between">
                            <div class="flex flex-col">
                                <span class=" font-bold">{{ surat.nomor }}. {{ surat.nama }}</span>
                                <span class=" text-xs">({{ surat.arti }})</span>
                            </div>
                            <div class=" font-quran text-lg font-bold">{{ surat.asma }}</div>
                        </div>
                    </div>
                </NuxtLink>
            </li>
            <li v-else v-for="surat in filteredSurat">
                <NuxtLink :to="`/surah/${surat.nomor}`">
                    <div class=" border-b-2 mb-3 p-7">
                        <div class=" flex flex-row justify-between">
                            <div class="flex flex-col">
                                <span class=" font-bold">{{ surat.nomor }}. {{ surat.nama }}</span>
                                <span class=" text-xs">({{ surat.arti }})</span>
                            </div>
                            <div class=" font-quran text-lg font-bold">{{ surat.asma }}</div>
                        </div>
                    </div>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: 'auth',
})
const searchValue = ref('')
const allSurat = ref(await getListSurat())
const filteredSurat = ref([])

const searchSurat = (value) => allSurat.value.filter(surat => surat.nomor.includes(value) || surat.nama.toLowerCase().includes(value.toLowerCase()))

watch(searchValue, (value, old) => { filteredSurat.value = searchSurat(value) })

</script>

<style lang="scss" scoped></style>