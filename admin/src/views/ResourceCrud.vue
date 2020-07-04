<template>
    <div>
        <avue-crud
        v-if="option.column"
        :data="data.data" 
        :option="option"
        :page.sync="page"
        @row-save="create"
        @row-update="update"
        @row-del="remove"
        @size-change="sizeChange"
        @current-change="currentChange"
        @sort-change="sortChange"
        @search-change="searchChange"
        ></avue-crud>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';


    @Component({})
    export default class Resource extends Vue{
        @Prop(String) resource !:string
        data:any = {};
        option:any = {};
        page:any = {
            currentPage: 1,
            total: 20,
            pageSize: 10
        };
        query:any = {
            limit:10
        };
        async fetchOption(){
            const res = await this.$http.get(`${this.resource}/option`);
            this.option = res.data;
            console.log(res);
        };

        async sortChange({ prop, order }){
            if(!order){
                this.query.sort = null;
            }else{
                this.query.sort = {
                    [prop]:order === 'ascending' ? 1 : -1
                }
            }
            this.fetch();
        };

        async searchChange(where,done){
            //模糊查询
            for(let k in where){
                const field = this.option.column.find(v=> v.prop === k)
                if(field.regex){
                    where[k] = { $regex: where[k] };
                }
            }
            this.query.where = where;
            this.fetch();
            done();
        };

        async fetch(){
            const res = await this.$http.get(this.resource,{
                params:{
                    query:this.query
                }
            });
            this.page.total = res.data.total;
            this.data = res.data;
            console.log(res);
        }
        
        async create(row, done, loading){
            await this.$http.post(this.resource,row);
            this.$message.success('创建成功');
            this.fetch();
            done();
        };

        async update(row,index,done,loading){
            const data = JSON.parse(JSON.stringify(row));
            delete data.$index;
            await this.$http.put(`${this.resource}/${row._id}`,data);
            this.$message.success('编辑成功');
            this.fetch();
            done();
        };

        async remove(row:any) {
            try {
                await this.$confirm('是否确认删除')
            } catch(e) {
                return;
            }
            await this.$http.delete(`${this.resource}/${row._id}`)
            this.$message.success('删除成功')
            this.fetch();
        };
        async sizeChange(val:Number) {
            this.query.limit = val;
            this.page.pageSize = val;
            this.fetch()
        };
        async currentChange(val:Number) {
            this.query.page = val;
            this.page.currentPage = val;
            this.fetch();
        };
        created(){
            this.fetchOption();
            this.fetch()
        }

    }
</script>

<style>

</style>