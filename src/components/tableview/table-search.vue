<template>
    <section class="table-status-bar">
        <el-row :gutter="5">
            <el-col v-if="isAddBtn">
                <el-button 
                    size="small" 
                    type="success" 
                    @click="$emit('handleNewAdd')">新增</el-button>
            </el-col>
            <el-col v-if="keyword.isKeyword">
                <el-input 
                    :placeholder="keyword.placeholder"
                    ref="resetText"
                    v-model="searchText" 
                    size="small"
                    clearable
                    @clear="handleInputSearch()" 
                    @keyup.enter.native="handleInputSearch()">
                    <el-button slot="append" icon="el-icon-search" @click="handleInputSearch()"></el-button>
                </el-input>
            </el-col>
            <el-col>
                <slot name="center-action-slot"></slot>
            </el-col>
            <el-col v-if="isSearchRadio">
                <el-radio-group 
                    style="display: flex; flex-wrap: nowrap;" 
                    v-model="searchRadio" 
                    size="small"
                    @change="handleSearchRadioChange">
                    <el-radio-button v-for="(item, index) in radioOptions" :label="item.id" :key="index">
                        {{ item.name }}
                    </el-radio-button>
                </el-radio-group>
            </el-col>
            <el-col>
                <slot name="end-action-slot"></slot>
            </el-col>
        </el-row>
    </section>
</template>

<script>

    export default {
        name: 'TableSearch',
        props: {
            //新增按钮
            isAddBtn: {
                type: Boolean,
                default: false
            },
            //文本搜索框
            keyword: {
                type: Object,
                default: {
                    isKeyword: false,
                    placeholder: '请输入关键字'
                }
            },
            isSearchRadio: {
                type: Boolean,
                default: false
            },
            radioValue: null,
            radioOptions: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                searchText: '',
                selectValue: '',
                searchRadio: null,
                excelActionLoading: false,
            }
        },
        methods: {
            handleKeywordSearch() {
                this.$emit('handleKeywordSearch', this.searchText);
            },
            handleSearchRadioChange(val) {
                this.$emit('handleSearchRadioChange', val);
            }
        }
    }
</script>
