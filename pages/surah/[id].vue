<template>
    <div>
        <ul v-if="isFetching">
            <li v-for="n in 10" :key="n">
                <div class="card card-side bg-base-100 shadow-sm mb-6">
                    <div class=" card-body">
                            <div class=" flex flex-col justify-between">
                                <div class="bg-gray-200 h-4 my-2 rounded-full animate-pulse"></div>
                                <div class="bg-gray-200 h-4 my-2 rounded-full animate-pulse"></div>
                            </div>
                    </div>
                </div>
            </li>
        </ul>
        <ClientOnly>
            <ListAyat @is-fetching="setLoading" :ayat="route.query.ayat"/>
        </ClientOnly>
    </div>
</template>
<script setup>
const isFetching = ref(true)
const route = useRoute()

const setLoading = (data) => {
    isFetching.value = data.value
}
// const route = useRoute()
// watchEffect(()=> {
//     scrollTo("#5")

//     // if(!isFetching && route.params.id){
//     //     console.log("routes ", route.params.id);
//     //     scrollTo("#5")
//     // }
// })
</script>
<style>
</style>
