<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>

        <!-- Scripts -->
        <script>
            window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
            'user' => Auth::user(),
            'pusherKey' => config('broadcasting.connections.pusher.key'),
          ]) !!};
        </script>

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
                <div class="offset-4 col-4 offset-sm-1 col-sm-10">
                    <li class="list-group-item active">Chat room (@{{ numberOfUsers }})</li>
                    <div class="badge badge-pill badge-primary">@{{ typing }}</div>
                    <ul class="list-group" v-chat-scroll>
                        <message-component
                        v-for="(value,index) in chat.message"
                        :key=value.index
                        :user=chat.user[index]
                        :color=chat.color[index]
                        :time=chat.time[index]
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
