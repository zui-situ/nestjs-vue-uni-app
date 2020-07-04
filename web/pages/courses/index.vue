<template>
    <div class="pa-3">
        <h3>热门课程</h3>
        <v-row>
            <v-col v-for="item in courses.data" :key="item._id">
                <v-card class="mx-auto" max-width="344" :to="`/courses/${item._id}`">
                    <v-img :src="item.cover" height="200px"></v-img>
                    <v-card-title>{{item.name}}</v-card-title>
                    <v-card-subtitle>{{item.createdAt}}</v-card-subtitle>
                    <v-card-actions>
                        <v-btn text>Share</v-btn>
                        <v-btn color="purple" text>Explore</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    async asyncData({ $axios }){
        const courses = await $axios.$get('courses')
        console.log(courses);
        return {
            courses
        }
    }
}
</script>
<style></style>