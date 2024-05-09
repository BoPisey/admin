<script setup>
import avatar from '@/assets/images/avatars/8.jpg'

const itemsCount = 42
</script>

<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
    
      <CDropdownItem> <CIcon icon="cil-user" /> Profile </CDropdownItem>
      <CDropdownDivider />
      <CDropdownItem @click="logout">
        <CIcon icon="cil-lock-locked" />
        Logout
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/vue';
import { CIcon } from '@coreui/icons-vue';

export default {
  components: {
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CIcon
  },
  methods: {
    logout() {
  // Clear user session
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
  // Redirect to the login page
  this.$router.push({ name: 'Login' }); // Use the route name 'Login'
}

  }
}
</script>