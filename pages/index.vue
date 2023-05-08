<template>
        <div>
        <h1>Daftar Surat</h1>
        <ul>
            <li v-for="surat in listSurat" :key="surat.nomor">
                <NuxtLink :to="`/surah/${surat.nomor}`">
                    <div class="card card-side bg-base-100 shadow-sm mb-3">
                        <div class=" card-body">
                            <div class=" flex flex-row justify-between">
                                <div>{{ surat.nomor }}. {{ surat.nama }}</div>
                                <div class=" font-quran text-lg">{{ surat.asma }}</div>
                            </div>

                        </div>
                    </div>
                </NuxtLink>
            </li>
        </ul>
    </div>

</template>

<script setup>
definePageMeta({
    middleware: 'auth'
})

const listSurat = await getListSurat()
</script>

<style lang="scss" scoped></style>