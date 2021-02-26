<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <style>
            .list-group{
                overflow-y: scroll;
                height: 200px;
            }
        </style>
    </head>

    <body>
        <div class="container">
            <div class="row mt-3" id="app">
                <div class="offset-4 col-4">
                    <li class="list-group-item active">Chat room</li>
                    <ul class="list-group" v-chat-scroll>
                        <message-component
                        v-for="(value,index) in chat.message"
                        :key=value.index
                        :user=chat.user[index]
                        :color=chat.color[index]
                        >
                            @{{ value }}
                        </message-component>
                    </ul>
                    <input type="text" class="form-control"
                           placeholder="Type your message"
                           v-model="message" v-on:keyup.enter="send">
                </div>
            </div>
        </div>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
