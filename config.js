module.exports ={
    'secretKey': '12345-67890-09876-54321',
    'mongoUrl': 'mongodb+srv://oslash:Oslash2021@cluster0.m3oy2.mongodb.net/oslash-twitter?retryWrites=true&w=majority',
    'roleDef' : {"role_user" : ["user_tweet_create", "user_tweet_edit", "user_tweet_read", "user_tweet_delete"],
                "role_admin" : ["user_tweet_create", "user_tweet_edit", "user_tweet_read", "user_tweet_delete",
                                "admin_tweet_create", "admin_tweet_edit", "admin_tweet_read", "admin_tweet_delete",
                                "request_create", "user_read", "user_edit"],
                "role_super" : ["user_tweet_create", "user_tweet_edit", "user_tweet_read", "user_tweet_delete",
                                "admin_tweet_create", "admin_tweet_edit", "admin_tweet_read", "admin_tweet_delete",
                                "request_create", "user_read", "user_edit", "logs_read", "request_edit", 
                                "request_read", "analytics"]
                }
}
