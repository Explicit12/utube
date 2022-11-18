<script setup lang="ts">
  import { useI18n } from "vue-i18n";

  import { useDropZone } from "@vueuse/core";
  import { ref, defineAsyncComponent } from "vue";

  import { useUserData } from "@/stores/userData";

  import CSVtoJSON from "@/helpers/CSVtoJSON";

  import type { Ref } from "vue";

  const TheError = defineAsyncComponent(
    () => import("@/components/TheError.vue"),
  );

  const { t } = useI18n();
  const userData = useUserData();

  const { subscribeToChannel } = userData;
  const fileError: Ref<Error | undefined> = ref();
  const importDropZone = ref<HTMLDivElement>();

  async function importDropZoneHandler(file: File[] | null): Promise<void> {
    try {
      if (file && file[0].type === "text/csv") {
        fileError.value = undefined;
        const channelsIds = await CSVtoJSON(file[0]);
        channelsIds?.forEach((id) => subscribeToChannel(id["Channel Id"]));
      } else {
        throw new Error("Wrong file type");
      }
    } catch (error) {
      console.error((error as Error).message);
      fileError.value = error as Error;
    }
  }

  async function importInputHandler(event: Event | null): Promise<void> {
    const element = event?.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    try {
      if (fileList && fileList[0].type === "text/csv") {
        fileError.value = undefined;
        const channelsIds = await CSVtoJSON(fileList[0]);
        channelsIds?.forEach((id) => subscribeToChannel(id["Channel Id"]));
      } else {
        throw new Error("Wrong file type");
      }
    } catch (error) {
      console.error((error as Error).message);
      fileError.value = error as Error;
    }
  }

  useDropZone(importDropZone, importDropZoneHandler);
</script>

<template>
  <div>
    <div
      ref="importDropZone"
      class="mt-6 flex h-64 w-full items-center justify-center rounded-lg border-4 border-dashed border-blue-600 p-4 text-center"
    >
      {{ t("drop-zone") }}
    </div>
    <input
      type="file"
      class="mt-4 block w-full font-sans text-base font-normal text-gray-900 file:block file:w-full file:rounded-lg file:border-2 file:border-transparent file:bg-blue-50 file:py-2 file:px-4 hover:cursor-pointer file:hover:cursor-pointer"
      @change="importInputHandler"
    />
    <TheError v-if="fileError" :message="fileError.message" class="h-fit p-2" />
  </div>
</template>

<i18n lang="json">
{
  "en-US": {
    "drop-zone": "Drop subscriptions.csv file here"
  },
  "uk-UA": {
    "drop-zone": "Перетягніть сюди subscriptions.csv файл"
  },
  "ru-RU": {
    "drop-zone": "Перетащите subscriptions.csv файл сюда"
  }
}
</i18n>
