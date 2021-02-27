<template>
    <!--All contents must be in one element-->
    <div>
        <li class="list-group-item" :class="className"><slot></slot>
            <span class="chat-time">{{ time }}</span>
            <span class="float-right">
                <button class="btn btn-sm btn-danger">delete</button>
            </span>
        </li>
        <small class="badge float-right mb-3" :class="badgeClass">{{ user }}</small>
    </div>
</template>

<script>
    export default {

        props:[
          'color',
          'user',
          'time'
        ],

        computed:{
            className(){
                return 'list-group-item-'+this.color;
            },
            badgeClass(){
                return 'badge-'+this.color;
            }
        },

        mounted() {
            console.log('Component mounted.')
        }
    }
</script>

<style>
    .chat-time{
        font-size: 8px;
        padding-left: 2px;
        color: #000000;
    }
</style>
