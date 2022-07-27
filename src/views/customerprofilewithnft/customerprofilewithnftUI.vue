<template>
    <base-material-card>
    <template v-slot:heading>
        <v-row class="row-page-header-margin">
            <v-col cols="12" md="4" class="headline"> Customer View </v-col>
            <v-col cols="12" md="6" offset="2">
                <button-component-editview
                v-if="isOld"
                :button1="'OK'"
                :button2="'Delete'"
                :button3="'View'"
                :button4="'Refresh'"
                :button5="'Exit'"
                @onSubmitFromChildren="onEdit"
                @onDeleteFromChildren="onDelete"
                @onViewFromChildren="onView"
                @onRefreshFromChildren="onRefresh"
                @onExitFromChildren="onExit"
                ></button-component-editview>
                <button-component-text
                v-if="isNew"
                :button1="'OK'"
                :button2="'View'"
                :button3="'Refresh'"
                :button4="'Exit'"
                @onSubmitFromChildren="onSave"
                @onViewFromChildren="onView"
                @onRefreshFromChildren="onRefresh"
                @onExitFromChildren="onExit"
                >
                    
                </button-component-text>
            </v-col>
        </v-row>
    
    </template>

    <br />
    <br />
    <v-container>
        <base-material-card>
        <template v-slot:heading>
            <div class="display-2 font-weight-light head">
                Customer Profile with NFT
            </div>
        </template>
        
        </base-material-card>
    </v-container>
    
    </base-material-card>
</template>

<script>
import ViewOKButton from "@/components/ViewOKButton.vue";
import EditDeleteViewButton from "@/components/EditDeleteViewButton.vue";
import { elementaryRules, compositeRules } from "@/rules/rules.js";
import { Get_Padded_Customer_Id } from "@/js/commonMethods.js";

export default {
  //name: "customerprofilewithnft",
}

</script>


<style scoped>
.v-card {
  margin-top: 0%;
}
</style>
