<!-- 推荐歌单详情头部 -->
<template>
	<div class="musicitemtop">
		<div class="top">
			<van-sticky>
				<div class="navbar">
					<div class="left">
						<van-nav-bar title="歌单" :border="false" @click-left="onClickLeft">
							<template #left>
								<svg class="icon" aria-hidden="true">
									<use xlink:href="#icon-xitongfanhui"></use>
								</svg>
							</template>
							<template #right>
								<van-icon name="search" />
							</template>
						</van-nav-bar>
					</div>
					<div class="right">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-gengduo"></use>
						</svg>
					</div>
				</div>
			</van-sticky>
		</div>
		<div v-if="playlist.creator" class="detail">
			<div class="coverImg">
				<img :src="playlist.coverImgUrl" alt="" />
				<span class="playCount">
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-play"></use>
					</svg>
					{{ changeCount(playlist.playCount) }}
				</span>
			</div>
			<div class="content">
				<span class="name">{{ playlist.name }}</span>
				<div class="creator">
					<div class="avatar">
						<img :src="playlist.creator.avatarUrl" alt="" />
						<img
							v-if="playlist.creator.avatarDetail"
							class="badge"
							:src="playlist.creator.avatarDetail.identityIconUrl"
							alt=""
						/>
					</div>
					<span class="nickname">{{ playlist.creator.nickname }}</span>
				</div>
				<div class="tags">
					<span v-for="(tag, i) in playlist.tags" :key="i">
						{{ tag }}
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-jiantou_liebiaoxiangyou_o"></use>
						</svg>
					</span>
				</div>
			</div>
		</div>
		<div class="description">
			<span>
				{{ playlist.description }}
			</span>
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-jiantou_liebiaoxiangyou_o"></use>
			</svg>
		</div>
		<div class="func">
			<van-button round icon="share">{{
				changeCount(playlist.shareCount)
			}}</van-button>
			<van-button round icon="chat">{{
				changeCount(playlist.commentCount)
			}}</van-button>
			<van-button round icon="add">{{
				changeCount(playlist.subscribedCount)
			}}</van-button>
		</div>
	</div>
</template>

<script setup>
import { onMounted } from "vue";
import { changeCount } from "@/common/js/changeCount";

// eslint-disable-next-line vue/no-setup-props-destructure, vue/require-prop-types
const { playlist } = defineProps(["playlist"]);
const onClickLeft = () => {
	history.back();
};
onMounted(() => {
	// console.log(playlist, '*****');
});
</script>

<style lang="less" scoped>
.musicitemtop {
	height: 292px;
	width: 100%;
	background: #c3988e;
	:deep(.van-sticky--fixed) {
		z-index: 0;
	}
	.top {
		position: relative;
		z-index: 1;
	}
	.navbar {
		display: flex;
		height: 48px;
		width: 100%;
		background: #c3988e;

		.left {
			flex: 1;
			height: 100%;

			.van-nav-bar {
				width: 100%;
				height: 100%;
				background: transparent;
				z-index: 0;

				:deep(.van-nav-bar__content) {
					height: 100%;
				}

				:deep(.van-nav-bar__title) {
					margin-left: 56px;
					font-size: 18px;
					color: #ffffff;
				}

				.van-icon {
					font-size: 24px;
					color: #ffffff;
				}

				span {
					font-size: 18px;
					margin-left: 16px;
				}

				.icon {
					width: 24px;
					height: 24px;
					fill: #ffffff;
				}
			}
		}

		.right {
			display: flex;
			align-items: center;
			justify-self: center;
			margin-right: 10px;

			.icon {
				width: 22px;
				height: 22px;
				fill: #ffffff;
			}
		}
	}

	.detail {
		display: flex;
		width: 100%;
		padding: 16px;

		.coverImg {
			position: relative;
			width: 120px;
			height: 120px;
			margin-right: 16px;

			img {
				position: relative;
				border-radius: 8px;
				width: 120px;
				height: 120px;
			}

			.playCount {
				position: absolute;
				right: 7px;
				top: 5px;
				display: flex;
				align-items: center;
				color: #ffffff;
				font-size: 14px;

				.icon {
					width: 14px;
					height: 14px;
				}
			}

			&::after {
				content: "";
				position: absolute;
				width: 106px;
				height: 100px;
				top: -6px;
				left: 7px;
				border-radius: 8px;
				background: #ffffff;
				opacity: 0.1;
			}
		}

		.content {
			flex: 1;

			.name {
				display: -webkit-inline-box;
				width: 100%;
				font-size: 16px;
				color: #ffffff;
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}

			.creator {
				display: flex;
				width: 100%;
				align-items: center;
				justify-content: start;
				margin: 14px 0;

				.avatar {
					position: relative;
					margin-right: 8px;

					img {
						width: 26px;
						height: 26px;
						border-radius: 50%;
					}

					.badge {
						position: absolute;
						right: 0;
						bottom: 0;
						transform: translate(40%, -25%);
						border-radius: 0;
						width: 12px;
						height: 12px;
					}
				}

				.nickname {
					font-size: 12px;
					color: #ffffff;
					opacity: 0.6;
				}
			}

			.tags {
				display: flex;
				font-size: 12px;

				span {
					display: flex;
					align-items: center;
					padding: 0 2px;
					margin-right: 6px;
					color: #ffffff;
					background: rgba(255, 255, 255, 0.1);
					border-radius: 4px;

					.icon {
						width: 12px;
						height: 12px;
						fill: #ffffff;
					}
				}
			}
		}
	}

	.description {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0 16px;

		span {
			display: -webkit-inline-block;
			max-width: calc(100% - 18px);
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			height: 16px;
			font-size: 12px;
			color: #ffffff;
			opacity: 0.6;
		}

		.icon {
			margin-left: 6px;
			width: 12px;
			height: 12px;
			fill: #ffffff;
			opacity: 0.4;
		}
	}

	.func {
		display: flex;
		width: 100%;
		margin: 16px 0;
		padding: 0 16px;
		justify-content: space-between;

		.van-button {
			width: 102px;
			font-size: 14px;
			background: rgba(255, 255, 255, 0.1);
			color: #ffffff;
			border: none;
			outline: none;

			&::before {
				background: transparent;
			}
		}
	}
}
</style>
