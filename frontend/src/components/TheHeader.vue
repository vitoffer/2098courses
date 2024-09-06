<script setup lang="ts"></script>

<template>
	<header class="header">
		<div class="header__inner">
			<a
				href="https://sch2098s.mskobr.ru"
				target="_blank"
				class="header__logo logo"
			>
				<img
					src="https://sch2098s.mskobr.ru/attach_files/logo/2098_logo_color%20%D0%BC%D0%B8%D0%BD.jpg"
					alt="Эмблема школы"
					width="80"
					class="logo__image"
				/>
			</a>
			<div class="header__branding branding">
				<h1 class="branding__title">Каталог кружков</h1>
				<h2 class="branding__description">
					ГБОУ Школа №2098 имени Л. М. Доватора
				</h2>
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
		padding-inline: 32px;
	}

	&__inner :not(a) {
		color: var(--text-black);
	}

	&__logo {
		margin-right: 24px;
	}

	&__branding {
		.branding {
			&__title {
				font: {
					size: 2rem;
					weight: bold;
				}
				text-transform: uppercase;
			}

			&__description {
				font-size: 1rem;
			}
		}
	}

	&__contacts {
		margin-left: auto;
		font-size: 1rem;
		text-align: center;
	}
}

.contacts-link {
	display: inline;
}
</style>
