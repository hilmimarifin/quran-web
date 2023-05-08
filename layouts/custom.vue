<template>
    <div>
        <div class=" flex flex-col">
            <div class="navbar bg-base-100">
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
                    <a @click="handleClickHome" class="btn btn-ghost normal-case text-xl">Nama Surat</a>
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
            <div class="p-5">
                <div class="card card-side bg-base-100 shadow-lg min-h-screen">
                    <div class="card-body">
                        <slot />
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>