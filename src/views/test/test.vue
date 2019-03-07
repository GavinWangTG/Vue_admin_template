<template>
	<section class="content-wrapper">
		<template v-if="$route.name === 'test'">
			<t-table-search 
				ref="search"
				isAddBtn
				:keyword="{isKeyword:true,placeholder:'请输入关键字'}"
				isSearchRadio
				:radioValue="search.status"
				:radioOptions="statusRadioOptions">
	      	</t-table-search>
	      	<t-table-pagination 
				:tableData="tableData"
	            :tableColumns="tableColumns"
	            :currentPage="currentPage"
	            :pageSize="pageSize"
	            :totalElements="totalElements"
	            actionFixed
	            isDelete
	            @handleEdit="handleEdit">
	        </t-table-pagination>
	    </template>
	    <template v-else>
	    	<transition name="fade" mode="out-in">
		    	<router-view></router-view>
		    </transition>
	    </template>
	</section>
</template>

<script>
	import TTableSearch from '@/components/tableview/table-search'
	import TTablePagination from '@/components/tableview/table-pagination'
	import tableColumnDynamic from '@/components/tableview/table-column-dynamic'

	export default {
		data() {
			return {
				isLoading: false,
				statusRadioValue: '全部',
				statusRadioOptions: [
					{id: '全部',name: '全部'},
					{id: '启用',name: '启用'},
                    {id: '禁用',name: '禁用'}
				],
				search: {
					status: null,
                    type: null
                },
				exportParams: null,
				currentPage: 1,
				pageSize: 15,
				totalElements: 100,
				tableData: [1,1,1,1,1,1,1,1,1,1,1,1,1,],
				tableColumns: [
					{
						label: '品牌简称/名称',
                        component: tableColumnDynamic,
                        setWidth: '140',
                        topText(row) {
                            return '肯德鸡';
                        },
                        isBottomText: true,
                        bottomText(row) {
                            return '肯德鸡';
                        }
					},
					{
						label: 'Logo',
                        component: tableColumnDynamic,
                        setWidth: '140',
                        topText(row) {
                            return '购物中心商铺';
                        }
					},
					{
						label: '类型',
                        component: tableColumnDynamic,
                        setWidth: '140',
                        topText(row) {
                            return '连锁品牌';
                        }
					},
					{
						label: '创建人',
                        component: tableColumnDynamic,
                        setWidth: '140',
                        topText(row) {
                            return '某某某';
                        },
                        isBottomText: true,
                        bottomText(row) {
                            return '18888888888';
                        }
					},
					{
						label: '相关客户',
                        component: tableColumnDynamic,
                        setWidth: '140',
                        topText(row) {
                            return '4';
                        }
					},
					{
						label: '状态',
                        component: tableColumnDynamic,
                        setWidth: '140',
                        topText(row) {
                            return '启用';
                        }
					}
				]
			}
		},
		components: {
			TTableSearch,
			TTablePagination
		},
		methods: {
			refreshData() {
                this.currentPage = 1;
            },
            handleEdit(index,item) {
            	this.$router.push({
            		name: 'edit'
            	})
            }
		}
	}
</script>