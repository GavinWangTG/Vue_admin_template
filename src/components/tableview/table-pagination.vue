<template>
    <section class="table-container">
        <el-table 
            :data="tableData" 
            border
            :max-height="maxTableHeight">
            <template v-for="(item, index) in tableColumns">
                <slot v-if="item.slot" :name="item.slot"></slot>
                <el-table-column v-else-if="item.type === 'index'" align="center" v-bind="item" :key="index"></el-table-column>
                <component v-else-if="item.component" :is="item.component" :column="item" :key="index"></component>
                <el-table-column 
                    v-else-if="item.setWidth"
                    align="center" 
                    v-bind="item" 
                    :key="index"
                    :min-width="item.setWidth">
                </el-table-column>
                <el-table-column v-else align="center" v-bind="item" :key="index"></el-table-column>
            </template>
            <el-table-column 
                v-if="isAction" 
                :label="actionLabel"
                :width="actionWidth"
                :fixed="actionFixed ? 'right':false"
                align="center">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button
                            v-if="isEdit"
                            icon="el-icon-edit"
                            type="success"
                            size="small"
                            @click="$emit('handleEdit',scope.$index, scope.row)">
                        </el-button>
                        <el-button
                            v-if="isDelete"
                            icon="el-icon-delete"
                            type="danger"
                            size="small"
                            @click="$emit('handleDelete',scope.$index, scope.row)">
                        </el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
        <div class="table-pagination-area" v-if="isPagination">
            <el-pagination 
                background
                :current-page="currentPage" 
                :page-size="pageSize" 
                :layout="layout" 
                :total="totalElements" 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </section>
</template>
<script>
    export default {
        name: 'TablePagination',

        props: {
            //列表数据
            tableData: {
                type: Array,
                default: () => []
            },
            //列表 ‘列’ 字段数据
            tableColumns: {
                type: Array,
                default: () => []
            },
            //分页
            isPagination: {
                type: Boolean,
                default: true
            },
            //操作栏
            isAction: {
                type: Boolean,
                default: true,
            },
            //操作栏 - label
            actionLabel: {
                type: String,
                default: '操作'
            },
            //操作栏 - 宽度
            actionWidth: {
                type: Number,
                default: 140
            },
            //操作栏 - 固定
            actionFixed: {
                type: Boolean,
                default: false
            },
            //编辑按钮
            isEdit: {
                type: Boolean,
                default: true
            },
            //删除按钮
            isDelete: {
                type: Boolean,
                default: false
            },

            //分页
            currentPage: {
                type: Number,
                default: 1
            },
            //每页条数
            pageSize: {
                type: Number,
                default: 20
            },
            //总条数
            totalElements: {
                type: Number,
                default: null
            },
            //分布组件布局
            layout: {
                type: String,
                default: 'total, prev, pager, next'
            }
        },
        data() {
            let maxTableHeight = this.getMaxTableHeight();
            return {
                maxTableHeight,
            }
        },
        methods: {
            getMaxTableHeight() {
                let windowHeight = parseInt(document.body.clientHeight);

                return windowHeight - 190;
            },
            handleSizeChange(size) {
                this.$emit('handleSizeChange', size)
            },
            handleCurrentChange(currentPage) {
                this.$emit('handleCurrentChange', currentPage)
            }
        },
        mounted() {
            window.onresize = () => {
                this.maxTableHeight = this.getMaxTableHeight();
            }
        }
    }

</script>
