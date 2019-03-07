<template>
	<el-table-column :min-width="column.setWidth" v-bind="column" align="center">
		<template slot-scope="{ row }">
			<div class="pic-box" v-if="column.isPic">
				<img v-if="column.picUrl(row)" v-lazy="column.picUrl(row)" :width="54" :height="38">
				<span v-if="column.showPicCount">{{ column.picCount(row) }}</span>
			</div>
			<!-- shell added：展示用户头像和昵称-->
			<div class="user-box" v-else-if="column.isUserWithAvatar">
				<img v-if="column.userAvatarUrl(row)" v-lazy="column.userAvatarUrl(row)" :width="38" :height="38">
				<p>{{ column.userName(row) }}</p>
			</div>
			<template v-else-if="column.isArrayList">
				<ul>
					<li v-for="item in column.columnArray(row)">
						<template v-if="column.arrayAttribute">
							{{ item[column.arrayAttribute] }}
						</template>
						<template v-else>
							{{ item }}
						</template>
					</li>
				</ul>
			</template>
			<template v-else-if="column.isHtml">
				<div v-html="column.topText(row).replace(/\r?\n/g, '<br />')" class="table-column-html"></div>
			</template>
			<template v-else-if="column.isArray">
				<div v-for="(item,index) in column.topText(row)" :key="index">{{item}}</div>
			</template>
			<template v-else-if="column.isTagList">
				<div class="table-xlh-tag-box">
					<el-tag v-for="(tag,index) in column.topText(row)" :key="index" size="mini">{{tag.name}}</el-tag>
				</div>
			</template>
			<template v-else>
				<span class="tcd-text-main">{{ column.topText(row) }}</span>
				<p class="tcd-text-minor" v-if="column.isBottomText">{{ column.bottomText(row) }}</p>
			</template>
		</template>
	</el-table-column>
</template>
<script>
export default {
	props: ['column']
};

</script>
<style lang="scss">
    .tcd-text-minor {
        font-size: 10px;
        color:#acacac;
    }
    .pic-box {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        >img {
            margin-right: 8px;
        }
    }
	.user-box {
		img {
			border-radius: 19px;
		}
		p {
			margin: 0px;
			margin-top: -6px;
		}
	}
	.table-column-html{
		width: 100%;
		text-align: left;
	}
	.table-xlh-tag-box{
		text-align: left;

		.el-tag{
			margin-right: 3px;
		}
	}
</style>
