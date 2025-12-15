<template>
  <div
    :class="[
      'w-64 bg-white h-screen fixed left-0 top-0 flex flex-col border-r border-gray-200 z-40 transition-transform duration-300',
      'md:translate-x-0',
      mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <div class="p-6 border-b border-gray-200 flex items-center justify-between">
      <Logo class="w-6 h-6" />
      <button
        @click="$emit('close')"
        class="md:hidden text-gray-500 hover:text-gray-700"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <nav class="flex-1 overflow-y-auto py-4">
      <div class="px-4 space-y-1">
        <a
          href="#"
          class="flex items-center gap-3 px-4 py-2.5 text-gray-700 rounded-lg bg-purple-50 border-l-4 border-purple-600"
        >
          <!-- <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg> -->
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.5 14.0001H14M0.5 6.50006L3.875 4.00006L6.12501 5.50006L14 0.500061M0.5 9.93232L3.875 7.25221L6.12501 8.86027L14 3.50006V11.0001H0.500012L0.5 9.93232Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

          <span class="font-normal text-sm font-sans text-black">Dashboard</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-2.5 text-gray-600 rounded-lg hover:bg-gray-50">
          <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.7905 9.70481C12.4952 9.70481 13.897 9.61007 14.3526 9.3055C14.5658 9.16298 14.7701 8.77873 14.7484 8.50689C14.7484 6.74783 11.8047 6.74783 11.8047 6.74783H10.8187C10.7999 6.74783 10.7814 6.74805 10.7627 6.74872C10.4836 6.75856 8.19917 6.86251 8.13798 7.6297M13.1653 2.91662C13.1653 3.79875 12.4565 4.51385 11.5821 4.51385C10.7077 4.51385 9.99894 3.79875 9.99894 2.91662C9.99894 2.0345 10.7077 1.3194 11.5821 1.3194C12.4565 1.3194 13.1653 2.0345 13.1653 2.91662ZM7.96345 3.0203C7.96345 4.41222 6.84501 5.5406 5.46535 5.5406C4.08569 5.5406 2.96725 4.41222 2.96725 3.0203C2.96725 1.62838 4.08569 0.5 5.46535 0.5C6.84501 0.5 7.96345 1.62838 7.96345 3.0203ZM10.0578 11.371C9.39645 11.8131 7.97076 12.5 5.49619 12.5C3.02163 12.5 1.59594 11.8131 0.934582 11.371C0.625112 11.1641 0.472582 10.7832 0.504055 10.3886C0.538583 9.95567 0.65829 9.52318 0.796399 9.14847C1.06558 8.41814 1.80614 8.0195 2.58449 8.0195H8.40789C9.18625 8.0195 9.92681 8.41815 10.196 9.14847C10.3341 9.52318 10.4538 9.95567 10.4883 10.3886C10.5198 10.7832 10.3673 11.1641 10.0578 11.371Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <span class="font-normal text-sm font-sans text-black">Team</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-2.5 text-gray-600 rounded-lg hover:bg-gray-50">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 3.24038L12.5 2.74038H12.5V3.24038ZM8.17308 3.24038L7.74433 3.49763L7.88998 3.74038H8.17308V3.24038ZM6.52885 0.5L6.95759 0.242752L6.81194 1.78814e-07H6.52885V0.5ZM2.75 0.5V0V0.5ZM0.5 2.75H1H0.5ZM14.75 5.49038L14.25 5.49038V5.49038H14.75ZM14.25 10.0913C14.25 10.3675 14.4739 10.5913 14.75 10.5913C15.0261 10.5913 15.25 10.3675 15.25 10.0913H14.25ZM0.500003 10.625H1H0.500003ZM0.500003 12.5L3.06964e-06 12.5L0.500003 12.5ZM12.5 14.75V14.25V14.75ZM2.75 14.75L2.75 15.25L2.75 14.75ZM14.75 10.625L14.25 10.625V10.625H14.75ZM14.75 12.5H15.25H14.75ZM11.75 7.625L11.75 7.125L11.75 7.125V7.625ZM3.5 7.625V8.125V7.625ZM12.5 2.74038H8.17308V3.74038H12.5V2.74038ZM8.60182 2.98313L6.95759 0.242752L6.1001 0.757248L7.74433 3.49763L8.60182 2.98313ZM6.52885 1.78814e-07L2.75 0L2.75 1L6.52885 1L6.52885 1.78814e-07ZM3.27826e-07 2.75L0 10.0913L1 10.0913L1 2.75H3.27826e-07ZM14.25 5.49038V10.0913H15.25V5.49038H14.25ZM12.5 3.74038C13.4665 3.74038 14.25 4.52388 14.25 5.49038L15.25 5.49038C15.25 3.9716 14.0188 2.74038 12.5 2.74038L12.5 3.74038ZM2.75 0C1.23122 -5.96046e-08 3.8743e-07 1.23122 3.27826e-07 2.75H1C1 1.7835 1.7835 1 2.75 1L2.75 0ZM3.15905e-06 10.625L3.06964e-06 12.5L1 12.5L1 10.625H3.15905e-06ZM12.5 14.25L2.75 14.25L2.75 15.25L12.5 15.25V14.25ZM14.25 10.625V12.5H15.25V10.625H14.25ZM11.75 7.125L3.5 7.125L3.5 8.125L11.75 8.125L11.75 7.125ZM15.25 10.625C15.25 8.692 13.683 7.125 11.75 7.125L11.75 8.125C13.1307 8.125 14.25 9.24429 14.25 10.625L15.25 10.625ZM1 10.625C1 9.24429 2.11929 8.125 3.5 8.125L3.5 7.125C1.56701 7.125 3.24845e-06 8.69201 3.15905e-06 10.625H1ZM3.06964e-06 12.5C3.01003e-06 14.0188 1.23122 15.25 2.75 15.25L2.75 14.25C1.78351 14.25 1 13.4665 1 12.5L3.06964e-06 12.5ZM12.5 15.25C14.0188 15.25 15.25 14.0188 15.25 12.5H14.25C14.25 13.4665 13.4665 14.25 12.5 14.25V15.25Z" fill="black"/>
          </svg>

          <span class="font-normal text-sm font-sans text-black">Projects</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-2.5 text-gray-600 rounded-lg hover:bg-gray-50">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.75 5.43269H0.5M4.33654 2.69231V0.5M10.9135 2.69231L10.9135 0.5M0.5 3.78847L0.5 12.5577C0.5 13.7685 1.48153 14.75 2.69231 14.75L12.5577 14.75C13.7685 14.75 14.75 13.7685 14.75 12.5577V3.78849C14.75 2.57771 13.7685 1.59618 12.5577 1.59618L2.69231 1.59616C1.48153 1.59616 0.5 2.57769 0.5 3.78847Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="font-normal text-sm font-sans text-black">Calendar</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-2.5 text-gray-600 rounded-lg hover:bg-gray-50">
          <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.99999 0.5H4.43751L0.500019 4.33654L0.500017 4.88462M4.99999 0.5H9.5C10.7426 0.5 11.75 1.48153 11.75 2.69231L11.75 12.5577C11.75 13.7685 10.7426 14.75 9.50001 14.75H2.75C1.50736 14.75 0.499997 13.7685 0.5 12.5577L0.500017 4.88462M4.99999 0.5V4.88462H0.500017" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="font-normal text-sm font-sans text-black">Documents</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-2.5 text-gray-600 rounded-lg hover:bg-gray-50">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.5 7.625C0.5 11.56 3.68997 14.75 7.625 14.75C11.56 14.75 14.75 11.56 14.75 7.625C14.75 3.68997 11.56 0.5 7.625 0.5M0.5 7.625C0.5 3.68997 3.68997 0.5 7.625 0.5M0.5 7.625H4.33425M7.625 0.5V4.33425M4.33425 7.625C4.33425 9.44243 5.80757 10.9157 7.625 10.9157C9.44243 10.9157 10.9157 9.44243 10.9157 7.625C10.9157 5.80757 9.44243 4.33425 7.625 4.33425M4.33425 7.625C4.33425 5.80757 5.80757 4.33425 7.625 4.33425" stroke="black"/>
          </svg>
          <span class="font-normal text-sm font-sans text-black">Report</span>
        </a>
      </div>

      <div class="px-4 mt-6">
        <p class="px-4 text-xs font-semibold text-grayside uppercase tracking-wider mb-2">Your teams</p>
        <div class="space-y-1">
          <a href="#" class="flex items-center gap-3 px-4 py-2.5 text-gray-600 rounded-lg hover:bg-gray-50">
            <div class="w-6 h-6 bg-graybg border border-grayborder rounded flex items-center justify-center">
              <span class="text-black text-xs font-bold">D</span>
            </div>
            <span class="font-normal text-sm font-sans text-black">Design</span>
          </a>
          <a href="#" class="flex items-center gap-3 px-4 py-2.5 text-gray-600 rounded-lg hover:bg-gray-50">
            <div class="w-6 h-6 bg-graybg border border-grayborder rounded flex items-center justify-center">
              <span class="text-black text-xs font-bold">E</span>
            </div>
            <span class="font-normal text-sm font-sans text-black">Engineering</span>
          </a>
        </div>
      </div>

      <div class="px-4 mt-6">
        <p class="px-4 text-xs font-semibold text-grayside uppercase tracking-wider mb-2">Reports</p>
        <div class="space-y-1">
          <a href="#" class="flex items-center gap-3 px-4 py-2.5 text-gray-600 rounded-lg hover:bg-gray-50">
            <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.500019 4.33654L0.151086 3.97842L1.90735e-05 4.12562L1.8537e-05 4.33654L0.500019 4.33654ZM4.43751 0.5V0H4.2342L4.08858 0.141886L4.43751 0.5ZM11.75 2.69231H11.25H11.75ZM11.75 12.5577H12.25H11.75ZM0.5 12.5577L1 12.5577L0.5 12.5577ZM4.99999 4.88462V5.38462H5.49999V4.88462H4.99999ZM0.500017 4.88462L1.71065e-05 4.88461L0.500017 4.88462ZM0.848951 4.69465L4.78644 0.858114L4.08858 0.141886L0.151086 3.97842L0.848951 4.69465ZM2.75 15.25H9.50001V14.25H2.75V15.25ZM11.25 2.69231L11.25 12.5577H12.25L12.25 2.69231H11.25ZM2.75 14.25C1.77118 14.25 0.999998 13.4802 1 12.5577L0 12.5577C-3.8743e-06 14.0568 1.24353 15.25 2.75 15.25V14.25ZM9.50001 15.25C11.0065 15.25 12.25 14.0568 12.25 12.5577H11.25C11.25 13.4802 10.4788 14.25 9.50001 14.25V15.25ZM9.5 1C10.4788 1 11.25 1.76984 11.25 2.69231H12.25C12.25 1.19322 11.0065 0 9.5 0V1ZM4.43751 1H4.99999V0H4.43751V1ZM4.99999 1H9.5V0H4.99999V1ZM1.8537e-05 4.33654L1.71065e-05 4.88461L1.00002 4.88462L1.00002 4.33654L1.8537e-05 4.33654ZM1.71065e-05 4.88461L0 12.5577L1 12.5577L1.00002 4.88462L1.71065e-05 4.88461ZM4.49999 0.5V4.88462H5.49999V0.5H4.49999ZM4.99999 4.38462H0.500017V5.38462H4.99999V4.38462ZM3.50001 7.57692H6.12501V6.57692H3.50001V7.57692ZM6.12501 7.57692H8.75V6.57692H6.12501V7.57692ZM3.50001 13.0577H6.12501V12.0577H3.50001V13.0577ZM6.12501 13.0577H8.75V12.0577H6.12501V13.0577ZM5.62501 7.07692V9.8173H6.62501V7.07692H5.62501ZM5.62501 9.8173V12.5577H6.62501V9.8173H5.62501ZM10 11.8077V9.8173H9V11.8077H10ZM10 9.8173V7.82692H9V9.8173H10ZM2.25001 7.82692V9.8173H3.25001V7.82692H2.25001ZM2.25001 9.8173V11.8077H3.25001V9.8173H2.25001ZM9.5 9.3173H6.12501V10.3173H9.5V9.3173ZM6.12501 9.3173H2.75001V10.3173H6.12501V9.3173ZM8.75 13.0577C9.44036 13.0577 10 12.498 10 11.8077H9C9 11.9458 8.88807 12.0577 8.75 12.0577V13.0577ZM3.50001 12.0577C3.36194 12.0577 3.25001 11.9458 3.25001 11.8077H2.25001C2.25001 12.498 2.80965 13.0577 3.50001 13.0577V12.0577ZM8.75 7.57692C8.88807 7.57692 9 7.68885 9 7.82692H10C10 7.13656 9.44036 6.57692 8.75 6.57692V7.57692ZM3.50001 6.57692C2.80966 6.57692 2.25001 7.13656 2.25001 7.82692H3.25001C3.25001 7.68885 3.36194 7.57692 3.50001 7.57692V6.57692Z" fill="black"/>
              </svg>

            <span class="font-normal text-sm font-sans text-black">Month to Date</span>
          </a>
          <a href="#" class="flex items-center gap-3 px-4 py-2.5 text-gray-600 rounded-lg hover:bg-gray-50">
            <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.500019 4.33654L0.151086 3.97842L1.90735e-05 4.12562L1.8537e-05 4.33654L0.500019 4.33654ZM4.43751 0.5V0H4.2342L4.08858 0.141886L4.43751 0.5ZM11.75 2.69231H11.25H11.75ZM11.75 12.5577H12.25H11.75ZM0.5 12.5577L1 12.5577L0.5 12.5577ZM4.99999 4.88462V5.38462H5.49999V4.88462H4.99999ZM0.500017 4.88462L1.71065e-05 4.88461L0.500017 4.88462ZM0.848951 4.69465L4.78644 0.858114L4.08858 0.141886L0.151086 3.97842L0.848951 4.69465ZM2.75 15.25H9.50001V14.25H2.75V15.25ZM11.25 2.69231L11.25 12.5577H12.25L12.25 2.69231H11.25ZM2.75 14.25C1.77118 14.25 0.999998 13.4802 1 12.5577L0 12.5577C-3.8743e-06 14.0568 1.24353 15.25 2.75 15.25V14.25ZM9.50001 15.25C11.0065 15.25 12.25 14.0568 12.25 12.5577H11.25C11.25 13.4802 10.4788 14.25 9.50001 14.25V15.25ZM9.5 1C10.4788 1 11.25 1.76984 11.25 2.69231H12.25C12.25 1.19322 11.0065 0 9.5 0V1ZM4.43751 1H4.99999V0H4.43751V1ZM4.99999 1H9.5V0H4.99999V1ZM1.8537e-05 4.33654L1.71065e-05 4.88461L1.00002 4.88462L1.00002 4.33654L1.8537e-05 4.33654ZM1.71065e-05 4.88461L0 12.5577L1 12.5577L1.00002 4.88462L1.71065e-05 4.88461ZM4.49999 0.5V4.88462H5.49999V0.5H4.49999ZM4.99999 4.38462H0.500017V5.38462H4.99999V4.38462ZM3.50001 7.57692H6.12501V6.57692H3.50001V7.57692ZM6.12501 7.57692H8.75V6.57692H6.12501V7.57692ZM3.50001 13.0577H6.12501V12.0577H3.50001V13.0577ZM6.12501 13.0577H8.75V12.0577H6.12501V13.0577ZM5.62501 7.07692V9.8173H6.62501V7.07692H5.62501ZM5.62501 9.8173V12.5577H6.62501V9.8173H5.62501ZM10 11.8077V9.8173H9V11.8077H10ZM10 9.8173V7.82692H9V9.8173H10ZM2.25001 7.82692V9.8173H3.25001V7.82692H2.25001ZM2.25001 9.8173V11.8077H3.25001V9.8173H2.25001ZM9.5 9.3173H6.12501V10.3173H9.5V9.3173ZM6.12501 9.3173H2.75001V10.3173H6.12501V9.3173ZM8.75 13.0577C9.44036 13.0577 10 12.498 10 11.8077H9C9 11.9458 8.88807 12.0577 8.75 12.0577V13.0577ZM3.50001 12.0577C3.36194 12.0577 3.25001 11.9458 3.25001 11.8077H2.25001C2.25001 12.498 2.80965 13.0577 3.50001 13.0577V12.0577ZM8.75 7.57692C8.88807 7.57692 9 7.68885 9 7.82692H10C10 7.13656 9.44036 6.57692 8.75 6.57692V7.57692ZM3.50001 6.57692C2.80966 6.57692 2.25001 7.13656 2.25001 7.82692H3.25001C3.25001 7.68885 3.36194 7.57692 3.50001 7.57692V6.57692Z" fill="black"/>
              </svg>
            <span class="font-normal text-sm font-sans text-black">Year to Date</span>
          </a>
        </div>
      </div>
    </nav>

    <div class="p-4 border-t border-gray-200">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <span class="text-picolo text-center font-semibold text-sm">DN</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Logo from '../assets/logo.vue'

defineProps({
  mobileMenuOpen: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['close'])
</script>

