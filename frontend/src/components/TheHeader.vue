<script setup lang="ts"></script>

<template>
	<header class="header">
		<div class="header__inner">
			<div class="header__branding branding">
				<a
					href="https://sch2098s.mskobr.ru"
					target="_blank"
					class="branding__logo logo"
				>
					<img
						src="https://sch2098s.mskobr.ru/attach_files/logo/2098_logo_color%20%D0%BC%D0%B8%D0%BD.jpg"
						alt="Эмблема школы"
						class="logo__image"
					/>
				</a>
				<div class="branding__info-wrapper">
					<h1 class="branding__title">Каталог кружков</h1>
					<h2 class="branding__description">
						ГБОУ Школа №2098 имени Л. М. Доватора
					</h2>
				</div>
			</div>
			<p class="header__contacts contacts">
				Ответственная по воспитательной работе:
				<br />
				<a
					href="tel:+74999068400"
					class="contacts-link"
				>
					+7 (499) 906-84-00
				</a>
				&nbsp;- Самсонова Анастасия Валерьевна
			</p>
		</div>
	</header>
</template>

<style scoped lang="scss">
.header {
	&__inner {
		display: flex;
		align-items: center;
		max-width: 1440px;
		height: 100px;
		margin: 0 auto;
		padding-inline: 16px;

		@media (max-width: 1024px) {
			flex-direction: column;
			justify-content: center;
			height: auto;
		}
	}

	&__inner :not(a) {
		color: var(--text-black);
	}

	&__branding {
		position: relative;
		display: flex;
		align-items: center;

		@media (max-width: 1024px) {
			padding-block: 8px;
			border-bottom: solid 1px var(--border-light-gray);
			text-align: center;
		}

		.branding {
			&__logo {
				margin-right: clamp(24px, 3vw, 32px);

				.logo {
					&__image {
						width: clamp(48px, 8vw, 80px);
					}
				}
			}

			&__title {
				font: {
					size: clamp(20px, 5vw, 32px);
					weight: bold;
				}
				text-transform: uppercase;
			}

			&__description {
				font-size: clamp(14px, 4vw, 16px);
			}
		}
	}

	&__contacts {
		margin-left: auto;
		font-size: clamp(12px, 3vw, 16px);
		line-height: 1.4;
		text-align: center;

		@media (max-width: 1024px) {
			margin: 0;
			padding-block: 4px 8px;
		}
	}
}

.contacts-link {
	display: inline;
}
</style>
