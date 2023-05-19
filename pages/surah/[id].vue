<template>
    <div>
        <ul v-if="isFetching">
            <li v-for="n in 10" :key="n">
                <div class="border-b-2 mb-3 p-7">
                    <div class=" flex flex-col justify-between">
                        <div class="bg-gray-200 h-4 my-2 rounded-full animate-pulse"></div>
                        <div class="bg-gray-200 h-4 my-2 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </li>
        </ul>
        <ClientOnly>
            <ListAyat @is-fetching="setLoading" :ayat="route.query.ayat" />
        </ClientOnly>
    </div>
</template>
<script setup>
const isFetching = ref(true)
const route = useRoute()

const setLoading = (data) => {
    isFetching.value = data.value
}
</script>
<style></style>
