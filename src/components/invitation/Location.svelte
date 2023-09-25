<script lang="ts">
  import { onMount } from 'svelte';

  import AppButton from './AppButton.svelte';

  import Icon from '~/components/icon/Icon.svelte';
  import { t } from '~/lib/i18n';
  import {
    getMobileOperatingSystem,
    openWithNewTab,
    type MobileOS,
  } from '~/lib/utils';

  const kakaoJsKey = 'b38384d098726c7239965fcc147d6a0a';
  const lat = 35.142304;
  const lng = 126.838703;

  let mobile: MobileOS;
  let Kakao: any;
  let kakao: any;

  let mapArea: HTMLDivElement;

  const address = $t('info.address');
  const place = $t('info.place');

  const openGoogleMap = () => {
    openWithNewTab('https://goo.gl/maps/xkcKVNUaeB9iskVB9');
  };

  const openNaverMap = () => {
    openWithNewTab(
      mobile === 'Android' || mobile === 'iOS'
        ? 'http://naver.me/5qCpf1Dw'
        : 'http://naver.me/GMFE7CaG',
    );
  };

  const openKakaoMap = () => {
    openWithNewTab('http://kko.to/awPzTApYj');
  };

  const openKakaoNavi = () => {
    Kakao.Navi.share({
      name: place,
      x: lng,
      y: lat,
      coordType: 'wgs84',
    });
  };

  onMount(() => {
    mobile = getMobileOperatingSystem();

    Kakao = (window as any).Kakao;
    kakao = (window as any).kakao;

    Kakao.init(kakaoJsKey);

    const map = new kakao.maps.Map(mapArea, {
      center: new kakao.maps.LatLng(lat, lng),
      level: 4, // zoom level
    });

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(address, (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        const marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div class="info-box" style="width: 150px; padding: 6px 0;">${place}</div>`,
        });
        infowindow.open(map, marker);

        map.setCenter(coords);
      }
    });
  });
</script>

<div class="bg-whiteF5 py-48">
  <div id="location" />

  <Icon name="location" color="#e2e2e2" size={48} class="mx-auto mb-16" />
  <div class="text-center text-10 tracking-[.25rem] text-grayB">LOCATION</div>

  <div
    bind:this={mapArea}
    class="map-area mt-32 h-200 border-b border-t border-[#eaeaea]"
  />

  <div class="mb-36 mt-24 flex items-center justify-center gap-16">
    <AppButton appName="google-map" on:click={openGoogleMap} />
    <AppButton appName="naver-map" on:click={openNaverMap} />
    <AppButton appName="kakao-map" on:click={openKakaoMap} />
    <AppButton appName="kakao-navi" on:click={openKakaoNavi} />
  </div>

  <div class="text-center text-14 text-grayA">
    <div>{address}</div>
    <div class="mt-4">TEL. {$t('info.contact')}</div>
  </div>

  <script
    src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoJsKey}&libraries=services`}
  ></script>
  <script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
</div>

<style>
  :global(.map-area *) {
    box-sizing: content-box;
  }

  :global(.map-area .info-box) {
    text-align: center;
  }
</style>
