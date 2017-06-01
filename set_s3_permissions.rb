#!/usr/bin/env ruby

require 'aws-sdk'
ENV['AWS_REGION'] = 'us-east-1'
s3 = Aws::S3::Resource.new
bucket = s3.bucket('stayskal')

bucket.objects.each do |object|
  key = object.key
  next unless key =~ /^sets\/.+/
  if (object.object.content_type != "application/octet-stream" || object.object.content_disposition != "attachment") then
    puts "Fixing metadata on " + key
    puts "  Previous content type: " + (object.object.content_type ||'')
    puts "  New content type: application/octet-stream"
    puts "  Previous content disposition: " + (object.object.content_disposition ||'')
    puts "  New content disposition: attachment"
    
    object.copy_from( 
      'stayskal/' + key,
      :content_type => "application/octet-stream",
      :content_disposition => "attachment", 
      :metadata_directive => 'REPLACE'
    )
  end
end
puts "Done."