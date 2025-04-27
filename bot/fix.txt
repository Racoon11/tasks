@csrf_exempt
def get_message(request):
  body = json.loads(request.body)
  
  if body["type"] == 'message_new':
    print(body['object']['message']['text'])
    if "payload" in body["object"]["message"]:
      if body["object"]["message"]["payload"] == '{"command":"start"}':
        start(request)
      elif body["object"]["message"]["payload"] == '{"command":"delete"}':
        user_id = body["object"]["message"]["from_id"]
        database.delete_member(user_id)
        print(database.get_db())
        start(request)
    elif body['object']['message']['text'] in ['Друзья', 'Одноклассники', "Программисты"]:
      user_id = body["object"]["message"]["from_id"]
      if body['object']['message']['text'] == 'Друзья':
        group = '{"command":"friends"}'
      elif body['object']['message']['text'] == 'Одноклассники':
        group = '{"command":"classmates"}'
      else:
        group = '{"command":"programmers"}'
      database.add_member(group,user_id)
      delete_button(request)
    else:
      talk(request)
  return HttpResponse("ok")
